import { mock } from "jest-mock-extended";
import { AudioStreamCouldntBeFoundError } from "./errors";
import { IGetPodcastAudioStreamRepository } from "./interfaces/repositories";
import { ListenToPodcastController } from "./ListenToPodcastController";

function makeSUT() {
  const getPodcastAudioStreamRepositoryMock =
    mock<IGetPodcastAudioStreamRepository>();
  const sut = new ListenToPodcastController(
    getPodcastAudioStreamRepositoryMock
  );

  return {
    sut,
    getPodcastAudioStreamRepositoryMock,
  };
}

describe("ListenToPodcastController", () => {
  it("should call IGetPodcastAudioStreamRepository.getStream once", async () => {
    const { sut, getPodcastAudioStreamRepositoryMock } = makeSUT();
    getPodcastAudioStreamRepositoryMock.getStream.mockResolvedValueOnce(
      Buffer.from("test")
    );
    const givenRequest: ListenToPodcastController.Request = {
      id: "podcast-id-0",
      segment: "index.m3u8",
    };

    await sut.execute(givenRequest);

    expect(getPodcastAudioStreamRepositoryMock.getStream).toHaveBeenCalledTimes(
      1
    );
  });

  it("should call IGetPodcastAudioStreamRepository.getStream once", async () => {
    const { sut, getPodcastAudioStreamRepositoryMock } = makeSUT();
    getPodcastAudioStreamRepositoryMock.getStream.mockResolvedValueOnce(
      undefined
    );
    const givenRequest: ListenToPodcastController.Request = {
      id: "podcast-id-0",
      segment: "index.m3u8",
    };

    const when = async () => await sut.execute(givenRequest);

    await expect(when).rejects.toThrowError(AudioStreamCouldntBeFoundError);
  });
});
