CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "public"."drivers_status_enum" AS ENUM('Available', 'Unavailable');
CREATE TABLE "drivers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."drivers_status_enum" NOT NULL DEFAULT 'Available', "personId" uuid, CONSTRAINT "REL_bffacbd6aa6409e21c2e63e993" UNIQUE ("personId"), CONSTRAINT "PK_92ab3fb69e566d3eb0cae896047" PRIMARY KEY ("id"));
CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "distanceInKilometer" numeric(10,6) NOT NULL, "issueDate" TIMESTAMP WITH TIME ZONE NOT NULL, "tripId" uuid, CONSTRAINT "REL_829f1794155ac603a00fc753f3" UNIQUE ("tripId"), CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"));
CREATE TYPE "public"."trips_status_enum" AS ENUM('InProgress', 'Completed');
CREATE TABLE "trips" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE, "startPositionLatitude" numeric(10,6) NOT NULL, "startPositionLongitude" numeric(10,6) NOT NULL, "endPositionLatitude" numeric(10,6) NOT NULL, "endPositionLongitude" numeric(10,6) NOT NULL, "status" "public"."trips_status_enum" NOT NULL DEFAULT 'InProgress', "driverId" uuid, "passengerId" uuid, CONSTRAINT "PK_f71c231dee9c05a9522f9e840f5" PRIMARY KEY ("id"));
CREATE TABLE "passengers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "personId" uuid, CONSTRAINT "REL_6126a65a949ff19f3b697f44be" UNIQUE ("personId"), CONSTRAINT "PK_9863c72acd866e4529f65c6c98c" PRIMARY KEY ("id"));
CREATE TABLE "people" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "middleName" character varying(50), "lastName" character varying(50) NOT NULL, "secondLastName" character varying(50), "latitude" numeric(10,6) NOT NULL, "longitude" numeric(10,6) NOT NULL, CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"));

ALTER TABLE "drivers" ADD CONSTRAINT "FK_bffacbd6aa6409e21c2e63e9930" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
ALTER TABLE "invoices" ADD CONSTRAINT "FK_829f1794155ac603a00fc753f30" FOREIGN KEY ("tripId") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
ALTER TABLE "trips" ADD CONSTRAINT "FK_fc5a8911f85074a660a4304baa1" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
ALTER TABLE "trips" ADD CONSTRAINT "FK_a4d572e126f5475433560c9a370" FOREIGN KEY ("passengerId") REFERENCES "passengers"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
ALTER TABLE "passengers" ADD CONSTRAINT "FK_6126a65a949ff19f3b697f44be7" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
