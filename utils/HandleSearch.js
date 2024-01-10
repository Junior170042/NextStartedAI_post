export const handleSearchWord = (array, word) => {
    const filterByTag = array.filter(post => post.tag === word)
    if (word == "") return array
    if (filterByTag.length != 0) return filterByTag

    const filterByUsername = array.filter(post => post.creator.username === word || post.creator.username.includes(word))
    if (filterByUsername) return filterByUsername

    const filterByWord = array.filter(post => post.post === word || post.post.includes(word))
    if (filterByWord) return filterByWord
    return array
}