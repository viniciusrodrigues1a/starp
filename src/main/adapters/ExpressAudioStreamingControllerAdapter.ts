import { Request, Response } from "express";

export function ExpressAudioStreamingControllerAdapter(
  controllerFactory: any
): (request: Request, response: Response) => Promise<void> {
  return async (request: Request, response: Response): Promise<void> => {
    const controller = controllerFactory();

    const { content } = await controller.execute({
      ...request.body,
      ...request.params,
      ...request.query,
    });

    response.end(content, "utf-8");
  };
}
