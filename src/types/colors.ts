export const getListColors = (position: number) => {
    let outputColor;
    switch (position) {
        case 0: 
            outputColor = "purple";
            break;
        case 1:
            outputColor = "yellow";
            break;
        case 2:
            outputColor = "blue";
            break;
        case 3:
            outputColor = "green";
            break;
        case 4:
            outputColor = "red";
            break;
        case 5:
            outputColor = "orange";
            break;
        case 6:
            outputColor = "#B4045F";
            break;
        case 7:
            outputColor = "#DF01D7";
            break;
        case 8:
            outputColor = "#2EFE2E";
            break;
        case 9:
            outputColor = "#B18904";
            break;
        case 10:
            outputColor = "#F781BE";
            break;
        case 11:
            outputColor = "#D8D8D8";
            break;
        default:
            outputColor = "#088A85"
            break;
    }

    return outputColor;
}