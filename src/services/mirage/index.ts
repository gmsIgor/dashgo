import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type User = {
    name: string;
    email: string;
    created_at: string;
}

export function makeServer() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },
        models: {
            user: Model.extend<Partial<User>>({})
        },

        factories: {
            user: Factory.extend({
                name(i: number) {
                    return faker.name.findName();
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(512);
                },
            })
        },

        seeds(server) {
            server.createList('user', 200);
        },

        routes() {
            this.namespace = 'api';
            this.timing = 750;

            this.get('/users', function (schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams;
                const nPage = Number(page);
                const nPer_page = Number(per_page);

                const total = schema.all('user').length;

                // const pageStart = (nPage - 1) * nPer_page;
                // const pageEnd = pageStart + nPer_page;

                const pageEnd = nPage * nPer_page;
                const pageStart = pageEnd - nPer_page;

                const users = this.serialize(schema.all('user'))
                    .users
                    .slice(pageStart, pageEnd);

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                );
            });
            this.get('/users/:id');
            this.post('/users');

            this.namespace = '';
            this.passthrough();
        }
    });

    return server;
}