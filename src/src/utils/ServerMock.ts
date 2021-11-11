import { setupServer } from 'msw/node';
import { API_URL, COMMENTS_POST_PATH, POSTS_PATH } from '../Const';
import { Post, CommentType } from '../types';
import { DefaultRequestBody, rest } from 'msw';

// **************************** MSW SERVER SETUP ****************************
const server = setupServer(

    // List posts
    rest.get<DefaultRequestBody, Post[]>(API_URL + POSTS_PATH,
        (req, res, ctx) => {
            return res(
                ctx.delay(100),
                ctx.json([
                    {
                        "userId": 1,
                        "id": 1,
                        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                    },
                    {
                        "userId": 1,
                        "id": 2,
                        "title": "qui est esse",
                        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
                    },])
            )
        }
    ),


    // List Comments
    rest.get<DefaultRequestBody, CommentType[]>(API_URL + '/comments',
        (req, res, ctx) => {

            return res(
                ctx.delay(100),
                ctx.json([
                    {
                        "postId": 1,
                        "id": 1,
                        "name": "id labore ex et quam laborum",
                        "email": "Eliseo@gardner.biz",
                        "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
                    },
                    {
                        "postId": 1,
                        "id": 2,
                        "name": "quo vero reiciendis velit similique earum",
                        "email": "Jayne_Kuhic@sydney.com",
                        "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
                    },
                    {
                        "postId": 1,
                        "id": 3,
                        "name": "odio adipisci rerum aut animi",
                        "email": "Nikita@garfield.biz",
                        "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
                    },
                    {
                        "postId": 1,
                        "id": 4,
                        "name": "alias odio sit",
                        "email": "Lew@alysha.tv",
                        "body": "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati"
                    },
                    {
                        "postId": 1,
                        "id": 5,
                        "name": "vero eaque aliquid doloribus et culpa",
                        "email": "Hayden@althea.biz",
                        "body": "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et"
                    }
                ])
            )
        }
    ),


    // Add comment
    rest.post<DefaultRequestBody, any>(API_URL + COMMENTS_POST_PATH,
        (req, res, ctx) => {
            return res(
                ctx.delay(100),
                ctx.json({ name: 'Dee', body: 'some text from server', email: 'john.dee@someemail.com', postId: 6, id: 501 })
            )
        }
    ),



);

export { server }