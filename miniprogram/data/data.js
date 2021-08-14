let classes = [{
        firstLetter: "B",
        classesByLetter: [
            'BILD 1', 'BILD 2', 'BILD 3', 'BILD 4', 'BICD 110'
        ]
    },
    {
        firstLetter: "C",
        classesByLetter: [
            'CHEM 6A', 'CHEM 6B', 'CHEM 6C', 'CHEM 7L', 'COGS 9',
            'COGS 101A', 'CSE 8A', 'CSE 8B', 'CSE 11', 'CSE 12',
            'CSE 20', 'CSE 30', 'CSE 105'
        ]
    },
    {
        firstLetter: "D",
        classesByLetter: [
            'DSC 10', 'DSC 20', 'DSC 30', 'DSC 40A', 'DSC 40B',
            'DSC 80'
        ]
    },
    {
        firstLetter: "E",
        classesByLetter: [
            'ECON 1', 'ECON 3', 'ECON 100A', 'ECON 100B', 'ECON 100C',
            'ECON 110A', 'ECON 110B', 'ECON 120A', 'ECON 120B', 'ECON 120C'
        ]
    },
    {
        firstLetter: "M",
        classesByLetter: [
            'MATH 10A', 'MATH 10B', 'MATH 10C', 'MATH 18', 'MATH 20A',
            'MATH 20B', 'MATH 20C', 'MATH 20D', 'MATH 20E', 'MATH 102',
            'MATH 109', 'MATH 170B', 'MATH 180A', 'MATH 183'
        ]
    },
    {
        firstLetter: "P",
        classesByLetter: [
            'PSYC 1', 'PSYC 2', 'PHYS 2C', 'PSYC 3', 'PSYC 4'
        ]
    }
]

function getSidebarData(classes) {
    let sidebarData = []
    for (let idx in classes) {
        sidebarData.push(classes[idx].firstLetter)
    }
    return sidebarData
}

let sidebarData = getSidebarData(classes)

function getAllClasses(classes) {
    let allClasses = []
    for (let idx in classes) {
        allClasses = allClasses.concat(classes[idx].classesByLetter)
    }
    return allClasses
}

let allClasses = getAllClasses(classes)

export {
    classes,
    sidebarData,
    allClasses
}