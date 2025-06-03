import {cleanup} from "@testing-library/react";
import {vi} from "vitest";
import {afterEach} from "vitest";


afterEach(() => {
    cleanup();
    vi.clearAllMocks();
})