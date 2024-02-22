export type SaveType = {
    annotationBlockValue: string,
    savePageName: string,
    saveUrlId: string,
    savePageId: string,
    subjectName: string,
    saveMarkdownId: string
}

export type CreateNewPage = {
    initialEditorState: any,
    newPageName: string,
    subjectPageLink: string,
    pageId: string,
    subjectName: string
}

export type PageArray = {
    annotation_block: any,
    email: string,
    markdown_id: string,
    name: string,
    page_id: string,
    page_name: string,
    subject_name: string,
    url_id: string,
    user_id: string
}
