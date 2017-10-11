Functions

    parseText
        input: txt file
        output: objects to database

    getNextPage
        input: document, first block
        output: array of blocks

    getPrevPage
        input: document, last block
        output: array of blocks

Database

    UserProgress
        Documents
            Current first block
            Current last block
        Current document



    TextBlocks
        Array of blocks
            text
            wordCount
            index
            document
            textType
                text
                heading

Database: EasyReader
    Collection: DocumentBlocks
        documentID
        index
        text
        textType
        wordCount
    Collection: DocumentMetadata
        documentID
        title
        author
    Collection: Users
        userID
        firstName
        lastName
        email
    Collection: UserProgress
        documentID
        currentIndex