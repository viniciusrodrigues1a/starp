import { NextFunction, Request, Response } from "express";

export function ExpressControllerAdapter(
  controllerFactory: any
): (request: Request, response: Response, next: NextFunction) => Promise<void> {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const controller = controllerFactory();
    try {
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
    } catch (err) {
      next(err);
    }
  };
}
