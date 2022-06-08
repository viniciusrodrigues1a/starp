import fs from "fs";

type AudioStream = {
  audioSize: number;
  stream: fs.ReadStream;
};

export namespace GetPodcastAudioStreamRepositoryDTO {
  export type Request = {
    id: string;
    start: number;
    end: number;
  };
  export type Response = AudioStream | undefined;
}

export interface IGetPodcastAudioStreamRepository {
  getStream(
    DTO: GetPodcastAudioStreamRepositoryDTO.Request
  ): Promise<GetPodcastAudioStreamRepositoryDTO.Response>;
}
