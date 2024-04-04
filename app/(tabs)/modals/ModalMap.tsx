import DashboardModal from "./DashboardModal";
import ReportsModal from "./ReportsModal";

export const componentMap = (map: any) => {
    // switch case map return component
    switch (map) {
        case 'DashboardModal':
            return <DashboardModal />;
        case 'ReportsModal':
            return <ReportsModal />;
        default:
            return null;
    }
}