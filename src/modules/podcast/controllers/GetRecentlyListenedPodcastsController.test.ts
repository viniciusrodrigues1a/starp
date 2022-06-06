import { mock } from "jest-mock-extended";
import { GetRecentlyListedPodcastsController } from "./GetRecentlyListenedPodcastsController";
import {
  FindAllPodcastsRecentlyListenedRepositoryDTO,
  IFindAllPodcastsRecentlyListenedRepository,
} from "./interfaces/repositories";

function makeSUT() {
  const findAllRecentlyListedPodcastsRepositoryMock =
    mock<IFindAllPodcastsRecentlyListenedRepository>();
  const sut = new GetRecentlyListedPodcastsController(
    findAllRecentlyListedPodcastsRepositoryMock
  );

  return {
    sut,
    findAllRecentlyListedPodcastsRepositoryMock,
  };
}

describe("GetRecentlyListedPodcastsController", () => {
  it("should call IFindAllPodcastsRepository.findAllPodcasts once", async () => {
    const { sut, findAllRecentlyListedPodcastsRepositoryMock } = makeSUT();
    findAllRecentlyListedPodcastsRepositoryMock.findAllPodcastsRecentlyListed.mockResolvedValueOnce(
      []
    );

    await sut.execute();

    expect(
      findAllRecentlyListedPodcastsRepositoryMock.findAllPodcastsRecentlyListed
    ).toHaveBeenCalledTimes(1);
  });

  it("should return podcasts recently listed", async () => {
    const { sut, findAllRecentlyListedPodcastsRepositoryMock } = makeSUT();
    const podcasts: FindAllPodcastsRecentlyListenedRepositoryDTO.Response =
      new Array(30).fill(0).map((_, index) => ({
        id: `podcast-id-${index}`,
        title: `My podcast #${index}`,
        artist: "Artist",
        image: null,
      }));
    findAllRecentlyListedPodcastsRepositoryMock.findAllPodcastsRecentlyListed.mockResolvedValueOnce(
      podcasts
    );

    const response = await sut.execute();
    expect(response.content).toStrictEqual(podcasts);
  });
});
