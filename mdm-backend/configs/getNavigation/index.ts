export default {
    "config": {
        "menuItems": {
            "order": [
                "dashboard",
                "users",
                "meters",
                "gateway",
                "projects",
                "consumers",
                "tarrifs",
                "meterRecharge",
                "deviceConfig",
                //"settings",
                "userSingle",
                "meterSingle",
                "projectSingle",
                "consumerSingle",
                "tarrifSingle",
                "logs"
            ],
            "dashboard": {
                "label": "Dashboard",
                "icon": "home",
                "pageComponent": "dashboard",
                "path": "/dashboard"
            },
            "users": {
                "label": "Users",
                "icon": "person",
                "pageComponent": "users",
                "path": "/users"
            },
            "userSingle": {
                "label": "User",
                "icon": "person",
                "pageComponent": "userSingle",
                "hide": true,
                "path": "/users/:id"
            },
            "meters": {
                "label": "Meters",
                "icon": "speedometer",
                "pageComponent": "meters",
                "path": "/meters"
            },
            "meterSingle": {
                "label": "Meters",
                "icon": "speedometer",
                "pageComponent": "meterSingle",
                "hide": true,
                "path": "/meters/:id"
            },
            "gateway": {
                "label": "Gateways",
                "icon": "Link",
                "pageComponent": "gateways",
                "path": "/gateways"
            },
            "projects": {
                "label": "Projects",
                "icon": "Document",
                "pageComponent": "projects",
                "path": "/projects"
            },
            "projectSingle": {
                "label": "Projects",
                "icon": "Document",
                "hide": true,
                "pageComponent": "projectSingle",
                "path": "/projects/:id"
            },
            "consumers": {
                "label": "Consumers",
                "icon": "People",
                "pageComponent": "consumers",
                "path": "/consumers"
            },
            "consumerSingle": {
                "label": "Consumers",
                "icon": "People",
                "hide": true,
                "pageComponent": "consumerSingle",
                "path": "/consumers/:id"
            },
            "tarrifs": {
                "label": "Tarrifs",
                "icon": "BuildSharp",
                "pageComponent": "tarrifs",
                "path": "/tarrifs"
            },
            "tarrifSingle": {
                "label": "Tarrifs",
                "icon": "BuildSharp",
                "hide": true,
                "pageComponent": "tarrifSingle",
                "path": "/tarrifs/:id"
            },
            "deviceConfig": {
                "label": "Device configuration",
                "icon": "Desktop",
                "pageComponent": "deviceConfig",
                "path": "/deviceConfig"
             },
            // "settings": {
            //     "label": "Settings",
            //     "icon": "BuildSharp",
            //     "pageComponent": "settings",
            //     "path": "/settings"
            // },
            "meterRecharge": {
                "label": "Meter Recharge",
                "icon": "BuildSharp",
                "pageComponent": "meterRecharge",
                "path": "/meterRecharge"
            },
            "logs":{
                "label": "Logs",
                "icon": "BuildSharp",
                "pageComponent": "logs",
                "path": "/logs"
            }
        }
    }
}