export default {
    "config": {
        "label": "All Users",
        "defaultFilters": {
            "currPage": 1,
            "perPage": 5
        },
        "filterConfig": {
            "filterType": {
                "label": "Filter Type",
                "columnSize": 12,
                "inputType": "selectInput",
                "selectOptions": [
                    {
                        "value": "-",
                        "description": "-"
                    },
                    {
                        "value": "userType",
                        "description": "User Type"
                    },
                    {
                        "value": "multiProject",
                        "description": "Project"
                    },
                    {
                        "value": "q",
                        "description": "Quick Search"
                    }
                ]
            },
            "filterValue": {
                "userType": {
                    "label": "Filter Value",
                    "columnSize": 12,
                    "inputType": "selectInput",
                    "selectOptions": [
                        {
                            "value": "-",
                            "description": "-"
                        },
                        {
                            "value": "mdmUsers",
                            "description": "MDM Users"
                        },
                        {
                            "value": "consumers",
                            "description": "Consumers"
                        },
                       
                       
                        
                    ]
                },
                "multiProject": {
                    "label": "Project",
                    "columnSize": 12,
                    "inputType": "selectInput",
                    "allowMultiple": true,
                    "isAutocomplete": true,
                    "selectOptions": [
                        {
                            "value": "-",
                            "description": "-"
                        }
                    ]
                },
                "q": {
                    "label": "Quick Search",
                    "columnSize": 12,
                    "inputType": "textInput"
                }
            }
        },
        columns: {
            order: [
                "name",
                "userName",
                "designation",
                "email",
                "mobileNo",
                "projectName"
            ],
            name: {
                label: "Name",
                renderType: "link",
            },
            userName: {
                label: "Username",
                renderType: "text"
            },
            designation: {
                label: "Designation",
                renderType: "text",
            },
            email: {
                label: "Email",
                renderType: "text"
            },
            mobileNo: {
                label:"Mobile NO.",
                renderType:"text",
            },
            projectName: {
                label: "Project Name",
                renderType: "text"
            },
            actions: {
                label: "Actions",
                renderType: "text"
            }
        }
    },
    data: {
        totalRecords: 9,
        rows: [
            {
                id: 'user_1_id',
                name: {
                    label: 'Diganta',
                    link: '/admin/users/diganta'
                },
                designation:'Admin',
                email: 'ray.diganta00@gmail.com',
                mobileNo:'+912244224422',
                projectName: 'Project 1'
            },
            {
                id: 'user_2_id',
                name: {
                    label: 'Harsh',
                    link: '/admin/users/harsh'
                },
                designation:'Admin',
                email: 'harsh@gmail.com',
                mobileNo:'+912244224422',
                projectName: 'Project 2'
            },
            {
                id: 'user_3_id',
                name: {
                    label: 'Diganta',
                    link: '/admin/users/diganta'
                },
                designation:'Admin',
                email: 'ray.diganta00@gmail.com',
                 mobileNo:'+912244224422',
                projectName: 'Project 3'
            },
            {
                id: 'user_4_id',
                name: {
                    label: 'Diganta',
                    link: '/admin/users/diganta'
                },
                designation:'Admin',
                email: 'ray.diganta00@gmail.com',
                mobileNo:'+912244224422',
                projectName: 'Project 4'
            },
            {
                id: 'user_5_id',
                name: {
                    label: 'Diganta',
                    link: '/admin/users/diganta'
                },
                designation:'Admin',
                email: 'ray.diganta00@gmail.com',
                mobileNo:'+912244224422',
                projectName: 'Project 5'
            }
        ]
    }
}