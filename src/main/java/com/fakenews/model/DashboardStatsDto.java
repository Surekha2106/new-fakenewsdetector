package com.fakenews.model;

public class DashboardStatsDto {
    private long totalAnalyses;
    private long fakeNewsCount;
    private long realNewsCount;

    public DashboardStatsDto(long totalAnalyses, long fakeNewsCount, long realNewsCount) {
        this.totalAnalyses = totalAnalyses;
        this.fakeNewsCount = fakeNewsCount;
        this.realNewsCount = realNewsCount;
    }

    // getters
    public long getTotalAnalyses() { return totalAnalyses; }
    public long getFakeNewsCount() { return fakeNewsCount; }
    public long getRealNewsCount() { return realNewsCount; }
}
