YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Logger",
        "Renderer",
        "requestHandlers",
        "route",
        "server"
    ],
    "modules": [
        "Logger",
        "Renderer",
        "requestHandlers",
        "route",
        "server"
    ],
    "allModules": [
        {
            "displayName": "Logger",
            "name": "Logger",
            "description": "A simple but handful logger ."
        },
        {
            "displayName": "Renderer",
            "name": "Renderer",
            "description": "Simple renderer using `mustache`."
        },
        {
            "displayName": "requestHandlers",
            "name": "requestHandlers",
            "description": "Request Handles.\nAvailable handles:\n  start: normal result pages\n  notFound: error 404 page\n  icon: favicon"
        },
        {
            "displayName": "route",
            "name": "route",
            "description": "Router to dispatch different handles based on pathname."
        },
        {
            "displayName": "server",
            "name": "server",
            "description": "Router to dispatch different handles based on pathname."
        }
    ]
} };
});