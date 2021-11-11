type Post = {
    userId: number
    id: number
    title: string
    body: string
}

type CommentType = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

type CommentFormValues = {
    name: string
    email: string
    body: string
}


export type { Post, CommentType, CommentFormValues }