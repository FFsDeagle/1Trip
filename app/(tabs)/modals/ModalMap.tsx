import DashboardModal from "./DashboardModal";
import ItemSearchModal from "./ItemSearchModal";
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
        case 'ItemSearchModal':
            return <ItemSearchModal />;
        default:
            return null;
    }
}