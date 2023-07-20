import { GA4React } from "ga-4-react";

const measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
const ga4react = new GA4React(measurementId).initialize();

const trackPathForAnalytics = (data) => {
    const { path, search, title } = data;
    ga4react
        .then((ga) => {
            ga.pageview(path, search, title);
        })
        .catch((err) => console.error(`Analytics failed: ${err}`));
};

export default trackPathForAnalytics;