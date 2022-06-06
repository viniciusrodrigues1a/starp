import { Request, Response } from "express";

export function ExpressControllerAdapter(
  controllerFactory: any
): (request: Request, response: Response) => Promise<void> {
  return async (request: Request, response: Response): Promise<void> => {
    const controller = controllerFactory();

    const controllerResponse = await controller.execute({
      ...request.body,
      ...request.params,
      ...request.query,
    });

    if (!controllerResponse) {
      response.status(204);
    } else {
      response.status(200);
    }

    response.json(controllerResponse);
  };
}
