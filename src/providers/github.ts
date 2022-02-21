import { GithubClient } from "../types";

export function GithubClientFactory(devKey?: string) {
    return new GithubClient(devKey)
}