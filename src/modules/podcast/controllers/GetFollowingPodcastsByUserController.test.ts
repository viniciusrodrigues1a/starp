import { mock } from "jest-mock-extended";
import { GetFollowingPodcastsByUserController } from "./GetFollowingPodcastsByUserController";
import {
  FindFollowingPodcastsByUserRepositoryDTO,
  IFindFollowingPodcastsByUserRepository,
} from "./interfaces/repositories";

function makeSUT() {
  const findFollowingPodcastsByUserRepositoryMock =
    mock<IFindFollowingPodcastsByUserRepository>();
  const sut = new GetFollowingPodcastsByUserController(
    findFollowingPodcastsByUserRepositoryMock
  );

  return {
    sut,
    findFollowingPodcastsByUserRepositoryMock,
  };
}

describe("GetFollowingPodcastsByUserController", () => {
  it("should call FindFollowingPodcastsByUserRepository.findFollowingPodcasts once and with userId", async () => {
    const { sut, findFollowingPodcastsByUserRepositoryMock } = makeSUT();
    findFollowingPodcastsByUserRepositoryMock.findFollowingPodcasts.mockResolvedValueOnce(
      []
    );

    const mockUserId = "QUQUSJ23782";

    await sut.execute({ userId: mockUserId });

    expect(
      findFollowingPodcastsByUserRepositoryMock.findFollowingPodcasts
    ).toHaveBeenCalledTimes(1);
    expect(
      findFollowingPodcastsByUserRepositoryMock.findFollowingPodcasts
    ).toHaveBeenCalledWith(mockUserId);
  });

  it("should return following podcasts", async () => {
    const { sut, findFollowingPodcastsByUserRepositoryMock } = makeSUT();
    const podcasts: FindFollowingPodcastsByUserRepositoryDTO.Response =
      new Array(30).fill(0).map((_, index) => ({
        id: `podcast-id-${index}`,
        title: `My podcast #${index}`,
        artist: "Artist",
        image: null,
        lengthInMilliseconds: 1100,
      }));
    findFollowingPodcastsByUserRepositoryMock.findFollowingPodcasts.mockResolvedValueOnce(
      podcasts
    );
    const mockUserId = "QUQUSJ23782";

    const response = await sut.execute({ userId: mockUserId });
    expect(response.content).toStrictEqual(podcasts);
  });
});
