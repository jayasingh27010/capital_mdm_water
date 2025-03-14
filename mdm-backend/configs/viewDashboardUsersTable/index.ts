export default {
    "config": {
        "label": "Admin Users",
        "defaultFilters": {
            "currPage": 1,
            "perPage": 5
        },
        "columns": {
            "order": [
                "user",
                "assignedProject",
                "email",
            ],
            "user": {
                "label": "User",
                "renderType": "link"
            },
            "email": {
                "label": "Email",
                "renderType": "text"
            },
            "assignedProject": {
                "label": "Assigned Project",
                "renderType": "link"
            },
            "actions": {
                "label": "Actions",
                "renderType": "text"
            }
        }
    },
    "data": {
        "totalRecords": 9,
        "rows": [
            {
                "id": "user_1_id",
                "user": {
                    "label": "Diganta",
                    "link": "/admin/users/diganta"
                },
                "assignedProject": {
                    "label": "Vasundhara",
                    "link": "/admin/projects/Vasundhara"
                },
                "actions": "View / Manage"
            },
            {
                "id": "user_2_id",
                "user": {
                    "label": "Harsh",
                    "link": "/admin/users/harsh"
                },
                "assignedProject": {
                    "label": "Vasundhara",
                    "link": "/admin/projects/Vasundhara"
                },
                "actions": "View / Manage"
            },
            {
                "id": "user_3_id",
                "user": {
                    "label": "Diganta",
                    "link": "/admin/users/diganta"
                },
                "assignedProject": {
                    "label": "Vasundhara",
                    "link": "/admin/projects/Vasundhara"
                },
                "actions": "View / Manage"
            },
            {
                "id": "user_4_id",
                "user": {
                    "label": "Diganta",
                    "link": "/admin/users/diganta"
                },
                "assignedProject": {
                    "label": "Vasundhara",
                    "link": "/admin/projects/Vasundhara"
                },
                "actions": "View / Manage"
            },
            {
                "id": "user_5_id",
                "user": {
                    "label": "Diganta",
                    "link": "/admin/users/diganta"
                },
                "assignedProject": {
                    "label": "Vasundhara",
                    "link": "/admin/projects/Vasundhara"
                },
                "actions": "View / Manage"
            }
        ]
    }
}