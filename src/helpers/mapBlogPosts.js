export default function mapBlogPosts (dbResults) {
    return dbResults.docs.map((doc) => {
        return {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDescr: doc.data().blogDescr,
            blogCookingTime: doc.data().blogCookingTime,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            selectedCategory: doc.data().categoryID,
            blogAuthor: doc.data().blogAuthor
        };
    });
}
