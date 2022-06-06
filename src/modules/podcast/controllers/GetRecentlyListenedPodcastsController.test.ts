import { mock } from "jest-mock-extended";
import { GetRecentlyListenedPodcastsController } from "./GetRecentlyListenedPodcastsController";
import {
  FindAllPodcastsRecentlyListenedRepositoryDTO,
  IFindAllPodcastsRecentlyListenedRepository,
} from "./interfaces/repositories";

function makeSUT() {
  const findAllRecentlyListenedPodcastsRepositoryMock =
    mock<IFindAllPodcastsRecentlyListenedRepository>();
  const sut = new GetRecentlyListenedPodcastsController(
    findAllRecentlyListenedPodcastsRepositoryMock
  );

  return {
    sut,
    findAllRecentlyListenedPodcastsRepositoryMock,
  };
}

describe("GetRecentlyListenedPodcastsController", () => {
  it("should call IFindAllPodcastsRepository.findAllPodcasts once", async () => {
    const { sut, findAllRecentlyListenedPodcastsRepositoryMock } = makeSUT();
    findAllRecentlyListenedPodcastsRepositoryMock.findAllPodcastsRecentlyListed.mockResolvedValueOnce(
      []
    );

    await sut.execute();

    expect(
      findAllRecentlyListenedPodcastsRepositoryMock.findAllPodcastsRecentlyListed
    ).toHaveBeenCalledTimes(1);
  });

  it("should return podcasts recently listed", async () => {
    const { sut, findAllRecentlyListenedPodcastsRepositoryMock } = makeSUT();
    const podcasts: FindAllPodcastsRecentlyListenedRepositoryDTO.Response =
      new Array(30).fill(0).map((_, index) => ({
        id: `podcast-id-${index}`,
        title: `My podcast #${index}`,
        artist: "Artist",
        image: null,
      }));
    findAllRecentlyListenedPodcastsRepositoryMock.findAllPodcastsRecentlyListed.mockResolvedValueOnce(
      podcasts
    );

    const response = await sut.execute();
    expect(response.content).toStrictEqual(podcasts);
  });
});
