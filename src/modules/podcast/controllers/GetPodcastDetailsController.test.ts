import { mock } from "jest-mock-extended";
import { PodcastCouldntBeFoundError } from "./errors/PodcastCouldntBeFoundError";
import { GetPodcastDetailsController } from "./GetPodcastDetailsController";
import {
  FindPodcastDetailsRepositoryDTO,
  IFindPodcastDetailsRepository,
} from "./interfaces/repositories";

function makeSUT() {
  const findPodcastDetailsRepositoryMock =
    mock<IFindPodcastDetailsRepository>();
  const sut = new GetPodcastDetailsController(findPodcastDetailsRepositoryMock);

  return {
    sut,
    findPodcastDetailsRepositoryMock,
  };
}

describe("GetPodcastDetailsController", () => {
  it("should call IFindPodcastDetailsRepository.findPodcast with podcast id", async () => {
    const { sut, findPodcastDetailsRepositoryMock } = makeSUT();
    const mockPodcastId = "AH2234BBKD";

    const givenRequest: FindPodcastDetailsRepositoryDTO.Response = {
      id: "podcast-id-0",
      artist: "Artist",
      date: new Date(),
      description: "Description ",
      image: "",
      lengthInMilliseconds: 2345,
      timesListened: 23344,
      timesStarred: 32344,
      title: "My Podcast",
    };
    findPodcastDetailsRepositoryMock.findPodcast.mockResolvedValue(
      givenRequest
    );

    await sut.execute({ id: mockPodcastId });

    expect(findPodcastDetailsRepositoryMock.findPodcast).toHaveBeenCalledTimes(
      1
    );
    expect(findPodcastDetailsRepositoryMock.findPodcast).toHaveBeenCalledWith(
      mockPodcastId
    );
  });

  it("should call IFindPodcastDetailsRepository.findPodcast with podcast id that not exist", async () => {
    const { sut, findPodcastDetailsRepositoryMock } = makeSUT();
    const mockPodcastId = "AH2234BBKD";

    findPodcastDetailsRepositoryMock.findPodcast.mockResolvedValue(null);

    const when = async () => await sut.execute({ id: mockPodcastId });

    await expect(when).rejects.toThrowError(PodcastCouldntBeFoundError);
  });
});
