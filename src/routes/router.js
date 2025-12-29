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
                        const component = await import("../pages/predict-food/predict-food-page")

                        return component.default
                    }
                }
            }

        ]
    }])
export default router;