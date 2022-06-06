import { mock } from "jest-mock-extended";
import { GetFollowingPodcastsByUserController } from "./GetFollowingPodcastsByUserController";
import {
  FindAllFollowingPodcastsByUserRepositoryDTO,
  IFindAllFollowingPodcastsByUserRepository,
} from "./interfaces/repositories";

function makeSUT() {
  const findAllFollowingPodcastsByUserRepositoryMock =
    mock<IFindAllFollowingPodcastsByUserRepository>();
  const sut = new GetFollowingPodcastsByUserController(
    findAllFollowingPodcastsByUserRepositoryMock
  );

  return {
    sut,
    findAllFollowingPodcastsByUserRepositoryMock,
  };
}

describe("GetFollowingPodcastsByUserController", () => {
  it("should call FindAllFollowingPodcastsByUserRepository.findAllFollowingPodcasts once and with userId", async () => {
    const { sut, findAllFollowingPodcastsByUserRepositoryMock } = makeSUT();
    findAllFollowingPodcastsByUserRepositoryMock.findAllFollowingPodcasts.mockResolvedValueOnce(
      []
    );

    const mockUserId = "QUQUSJ23782";

    await sut.execute({ userId: mockUserId });

    expect(
      findAllFollowingPodcastsByUserRepositoryMock.findAllFollowingPodcasts
    ).toHaveBeenCalledTimes(1);
    expect(
      findAllFollowingPodcastsByUserRepositoryMock.findAllFollowingPodcasts
    ).toHaveBeenCalledWith(mockUserId);
  });

  it("should return following podcasts", async () => {
    const { sut, findAllFollowingPodcastsByUserRepositoryMock } = makeSUT();
    const podcasts: FindAllFollowingPodcastsByUserRepositoryDTO.Response =
      new Array(30).fill(0).map((_, index) => ({
        id: `podcast-id-${index}`,
        title: `My podcast #${index}`,
        artist: "Artist",
        image: null,
        lengthInMilliseconds: 1100,
      }));
    findAllFollowingPodcastsByUserRepositoryMock.findAllFollowingPodcasts.mockResolvedValueOnce(
      podcasts
    );
    const mockUserId = "QUQUSJ23782";

    const response = await sut.execute({ userId: mockUserId });
    expect(response.content).toStrictEqual(podcasts);
  });
});
