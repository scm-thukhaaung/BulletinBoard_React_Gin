export const formatDate = (date: string) => {
    const dateString = date;
    const dateData = new Date(dateString);
    const formattedDate = `${dateData.getDate()}-${dateData.getMonth() + 1}-${dateData.getFullYear()}`;
    return formattedDate;
}