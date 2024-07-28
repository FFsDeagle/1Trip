import DashboardModal from "./DashboardModal";
import ReportsModal from "./ReportsModal";
import SearchResultsModal from "./SearchResultsModal";

export const componentMap = (map: string, navigationParam: string) => {
    // switch case map return component
    switch (map) {
        case 'DashboardModal':
            return <DashboardModal />;
        case 'ReportsModal':
            return <ReportsModal />;
        case 'SearchResultsModal':
            return <SearchResultsModal />;
        default:
            return null;
    }
}