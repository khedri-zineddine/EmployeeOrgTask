export const employeeOrg = {
    uniqueId: 1,
    name: "Mark Zuckerberg",
    subordinates: [
        {
            uniqueId: 2,
            name: "Sarah",
            subordinates: [
                {
                    uniqueId: 3,
                    name: "Cassandra",
                    subordinates: [
                        {
                            uniqueId: 4,
                            name: 'Mary',
                            subordinates: []
                        },
                        {
                            uniqueId: 5,
                            name: "Bob",
                            subordinates: [
                                {
                                    uniqueId: 6,
                                    name: 'Tina',
                                    subordinates: [
                                        {
                                            uniqueId: 7,
                                            name: 'Will',
                                            subordinates: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            uniqueId: 8,
            name: "Tyler",
            subordinates: [
                {
                    uniqueId: 9,
                    name: "Harry",
                    subordinates: [
                        {
                            uniqueId: 10,
                            name: "Thomas",
                            subordinates: []
                        }
                    ]
                },
                {
                    uniqueId: 11,
                    name: "George",
                    subordinates: []
                },
                {
                    uniqueId: 12,
                    name: "Gary",
                    subordinates: []
                }
            ]
        },
        {
            uniqueId: 13,
            name: "Bruce",
            subordinates: []
        },
        {
            uniqueId: 14,
            name: "Georgina",
            subordinates: [
                {
                    uniqueId: 15,
                    name: "Sophie",
                    subordinates: []
                }
            ]
        }

    ]
}