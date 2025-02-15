import jsPDF from "jspdf";
import { addDays, startOfWeek, formatISO9075, format } from "date-fns";
import { toast } from "react-toastify";

function getWeekDays(weekStart) {
  const days = [];

  for (let i = 0; i < 7; i += 1) {
    //changes DATE data into an ISO date format STRING and keeps only yyyy-mm-dd (ex: "2025-01-23")
    days.push(formatISO9075(addDays(weekStart, i), { representation: "date" }));
  }

  return days;
}

export default function downloadMenuPDF(weekStart) {
  const currentWeekDays = getWeekDays(weekStart);
  const nextWeekDays = getWeekDays(
    startOfWeek(addDays(weekStart, 7), {
      weekStartsOn: 1,
    })
  );

  const menuDishes = JSON.parse(localStorage.getItem("generatedWeeklyMenu"));
  const showSuccess = () =>
    toast.success("Your menu is downloading!", {
      theme: "colored",
    });
  const showError = () =>
    toast.error("There was an error. Please try again!", {
      theme: "colored",
    });
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Weekly Menu", pageWidth / 2, 20, "center");

    const formatMenuData = (days, weekData, title, yOffset) => {
      const dayLabels = [];

      if (title === "Selected Week") {
        for (let i = 0; i < 7; i += 1) {
          //changes DATE data into a STRING and removes time data (ex: "Mon Jan 20 2025")
          dayLabels.push(format(addDays(weekStart, i), "EEE MMM-dd-yyyy"));
        }
      } else {
        for (let i = 0; i < 7; i += 1) {
          //changes DATE data into a STRING and removes time data (ex: "Mon Jan 20 2025")
          dayLabels.push(
            format(
              addDays(
                startOfWeek(addDays(weekStart, 7), {
                  weekStartsOn: 1,
                }),
                i
              ),
              "EEE MMM-dd-yyyy"
            )
          );
        }
      }

      doc.setFont("helvetica", "bolditalic");
      doc.setFontSize(13);
      doc.text(`${title} :  ${dayLabels[0]} ~ ${dayLabels[6]}`, 15, yOffset);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      // if local storage exists and is not empty
      if (weekData !== null && weekData.length > 0) {
        // filters local storage to only current week days
        const filteredStoredWeeklyMenu = weekData.filter((x) =>
          days.includes(x.id)
        );

        const daysObjects = [];

        for (let i = 0; i < 7; i += 1) {
          daysObjects.push(
            filteredStoredWeeklyMenu.find((x) => x.id === days[i])
          );
        }

        // if there is dish data stored for that week
        if (daysObjects[0] !== undefined) {
          daysObjects.forEach((x, index) => {
            doc.text(
              `•  ${dayLabels[index]} : ${
                x.off === false ? x.menu.name : "Day Off"
              }`,
              15,
              yOffset + (index + 1) * 10
            );
          });
        } else {
          dayLabels.forEach((x, index) => {
            doc.text(
              `•  ${x} : Menu Not Generated`,
              15,
              yOffset + (index + 1) * 10
            );
          });
        }
      } else {
        //if at initial state
        dayLabels.forEach((x, index) => {
          doc.text(
            `•  ${x} : Menu Not Generated`,
            15,
            yOffset + (index + 1) * 10
          );
        });
      }
    };

    formatMenuData(currentWeekDays, menuDishes, "Selected Week", 40);
    formatMenuData(nextWeekDays, menuDishes, "Upcoming Week", 130);
    doc.save("WeeklyMenu.pdf");
    showSuccess();
  } catch (error) {
    console.error("PDF Generation Error:", error);
    showError();
  }
}
