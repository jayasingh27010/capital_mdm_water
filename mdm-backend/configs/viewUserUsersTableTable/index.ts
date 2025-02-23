export default {
    config: {
        id: "",
        label: "",
        defaultFilters: {
            currPage: 1,
            perPage: 5
        },
        columns: {
            order: [
                "user",
                "userName",
                "email",
                "accountType",
                "assignedProject",
                "actions"
            ],
            user: {
                label: "User",
                renderType: "link",
            },
            userName: {
                label: "Username",
                renderType: "text",
            },
            email: {
                label: "Email",
                renderType: "text"
            },
            accountType: {
                label: "Account Type",
                renderType: "text"
            },
            assignedProject: {
                label: "Assigned Project",
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