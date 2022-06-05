import { mock } from "jest-mock-extended";
import { GetMostListenedPodcastsController } from "./GetMostListenedPodcastsController";
import {
  FindAllPodcastsRepositoryDTO,
  IFindAllPodcastsRepository,
} from "./interfaces/repositories";

function makeSUT() {
  const findAllPodcastsRepositoryMock = mock<IFindAllPodcastsRepository>();
  const sut = new GetMostListenedPodcastsController(
    findAllPodcastsRepositoryMock
  );

  return {
    sut,
    findAllPodcastsRepositoryMock,
  };
}

describe("GetMostListenedPodcastsController", () => {
  it("should call IFindAllPodcastsRepository.findAllPodcasts once", async () => {
    const { sut, findAllPodcastsRepositoryMock } = makeSUT();
    findAllPodcastsRepositoryMock.findAllPodcasts.mockResolvedValueOnce([]);

    await sut.execute();

    expect(findAllPodcastsRepositoryMock.findAllPodcasts).toHaveBeenCalledTimes(
      1
    );
  });

  it("should return 20 podcasts in ascending order sorted by the timesListened field", async () => {
    const { sut, findAllPodcastsRepositoryMock } = makeSUT();
    const podcasts: FindAllPodcastsRepositoryDTO.Response = new Array(30)
      .fill(0)
      .map((_, index) => ({
        id: `podcast-id-${index}`,
        title: `My podcast #${index}`,
        artist: "Artist",
        image: null,
        lengthInMilliseconds: 1100,
        timesListened: Math.floor(Math.random() * 100),
        timesStarred: 0,
      }));
    findAllPodcastsRepositoryMock.findAllPodcasts.mockResolvedValueOnce(
      podcasts
    );

    const response = await sut.execute();

    const sortedPodcasts = [...podcasts]
      .sort((a, b) => b.timesListened - a.timesListened)
      .slice(0, 20);
    expect(response.content).toStrictEqual(sortedPodcasts);
  });
});
