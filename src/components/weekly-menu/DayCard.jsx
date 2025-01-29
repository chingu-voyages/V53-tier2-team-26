/* eslint-disable react/prop-types -- bypass proptypes error */

export function DayCard({ dish, day }) {
    return (
        <div>
            <h3 className="text-center p-2">{day}</h3>
            <div className="grid items-center justify-center bg-slate-300 w-60 h-72">
                <p>{dish}</p>
                <p></p>
            </div>
        </div>
    );
}
