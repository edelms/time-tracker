
import { WeekNavigator } from "./WeekNavigator";
import { DayGrid } from "./DayGrid";
import { StatsForWeek } from "./StatsForWeek";

export const TimebookingPage = () => {
    return (
        <>
            <WeekNavigator />
            <StatsForWeek />
            <DayGrid />
        </>
    );
}
