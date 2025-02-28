function capitaliseFirst(string){   
    return string ? string[0].toUpperCase() + string.slice(1) : "";
}

export default capitaliseFirst;