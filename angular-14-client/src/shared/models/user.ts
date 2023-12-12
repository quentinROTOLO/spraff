export class User {
  readonly id: string | null; // id de l’utilisateur qui peut être une chaîne ou "null".
  email: string; // email de l’utilisateur
  name: string; // nom de l’utilisateur

  constructor(options: {
    id?: string,
    email?: string,
    name?: string,
  } = {}
  ) {
    this.id = options.id || null;
    this.email = options.email || '';
    this.name = options.name || '';
  }
}
