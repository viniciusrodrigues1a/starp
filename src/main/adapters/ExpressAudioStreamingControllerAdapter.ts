import fs from "fs";
import { Request, Response } from "express";

type AudioStreamingControllerResponse = {
  content: {
    audioSize: number;
    stream: fs.ReadStream;
    mimeType: string;
  };
};

export function ExpressAudioStreamingControllerAdapter(
  controllerFactory: any
): (request: Request, response: Response) => Promise<void> {
  return async (request: Request, response: Response): Promise<void> => {
    const { range } = request.headers;
    if (!range) {
      response.status(400).json({ error: "Range header is required" });
      return;
    }
    const controller = controllerFactory();

    const chunkSize = 10 ** 6; // 1MB
    const start = Number(range?.replace(/\D/g, ""));
    const end = start + chunkSize;

    const {
      content: { audioSize, stream, mimeType },
    } = (await controller.execute({
      ...request.body,
      ...request.params,
      ...request.query,
      start,
      end,
    })) as AudioStreamingControllerResponse;

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${audioSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": mimeType,
    };

    response.writeHead(206, headers);

    stream.pipe(response);
  };
}
