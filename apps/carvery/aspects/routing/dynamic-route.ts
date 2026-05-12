export class DynamicRoute<TRouteParams extends object> {
  public constructor(public template: string) {}

  public resolveRoute(params: TRouteParams): string {
    return Object.entries(params).reduce<string>(
      (path, [key, value]) => path.replace(`/{${key}}`, `/${String(value)}`),
      this.template,
    );
  }
}
