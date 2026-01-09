import { Children, Component, lazy } from "react";
import { createBrowserRouter } from "react-router";
import mainLayout from "../layouts/main-layout";

const router = createBrowserRouter([
    {
        path : "/",
        Component : mainLayout,
        children : [
            {
                index : true,
                lazy : {
                    Component : async() => {
                        const component = await import("../pages/home/home-page")

                        return component.default
                    }
                }
            },
            {
                path : "predict-food",
                lazy : {
                    Component : async() => {
                        const component = await import("../pages/predict-food/predict-food-page")

                        return component.default
                    }
                }
            },
            {
                path : "predict-weight",
                lazy : {
                    Component : async() => {
                        const component = await import("../pages/predict-weight/predict-weight-page")

                        return component.default
                    }
                }
            },
            {
                path : "history",
                lazy : {
                    Component : async() => {
                        const component = await import("../pages/history/history-page")

                        return component.default
                    }
                }
            },
            {
                path : "about",
                lazy : {
                    Component : async() => {
                        const component = await import("../pages/about/about-page")

                        return component.default
                    }
                }
            }

        ]
    }])
export default router;