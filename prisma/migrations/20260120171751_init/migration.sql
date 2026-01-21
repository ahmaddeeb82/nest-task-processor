-- CreateTable
CREATE TABLE "AirQualityAlert" (
    "id" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "aqi" INTEGER,
    "category" TEXT,
    "dominantPollutant" TEXT,
    "pm25" DOUBLE PRECISION,
    "pm10" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AirQualityAlert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AirQualityAlert_timestamp_idx" ON "AirQualityAlert"("timestamp");

-- CreateIndex
CREATE INDEX "AirQualityAlert_city_idx" ON "AirQualityAlert"("city");

-- CreateIndex
CREATE INDEX "AirQualityAlert_regionCode_idx" ON "AirQualityAlert"("regionCode");
