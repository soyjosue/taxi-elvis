INSERT INTO "people" ("id", "firstName", "middleName", "lastName", "secondLastName", "latitude", "longitude")
      VALUES
      ('dc0ed381-ba43-4002-9384-bccf2b496db7', 'Juan', 'A.', 'Perez', 'Diaz', 18.4880, -69.9300),
      ('5b936f74-dba2-49bf-b2f5-2a7ec2e652d5', 'Maria', 'B.', 'Lopez', NULL, 18.4850, -69.9350),
      ('33339b60-a57a-4b7e-b875-1127b195ca6b', 'Carlos', NULL, 'Gomez', 'Santos', 18.4900, -69.9400),
      ('1c191662-1684-44f7-9c10-1471a9160e49', 'Ana', 'C.', 'Fernandez', NULL, 18.4930, -69.9250),
      ('6de13b3c-cf32-4492-859f-dcff45c6b073', 'Pedro', NULL, 'Martinez', 'Rojas', 18.4820, -69.9200),
      ('c8b50ace-b60b-4bf4-9886-41bc08792e44', 'Lucia', 'D.', 'Garcia', NULL, 18.4870, -69.9150),
      ('51b92010-d52b-4ece-b484-95a540e2ec6e', 'Jose', NULL, 'Rodriguez', NULL, 18.4810, -69.9180),
      ('0affa4c5-c616-40dd-bdf7-010eda2f6f4d', 'Carla', NULL, 'Sanchez', 'Lopez', 18.4920, -69.9320),
      ('f39c8a73-601d-4292-8059-8e3cb05762c2', 'Miguel', 'E.', 'Reyes', NULL, 18.4800, -69.9300),
      ('ba44239c-4b46-4826-8257-07a737be3478', 'Sofia', NULL, 'Diaz', 'Mendez', 18.4865, -69.9330),
      ('f3f99419-48f7-4eac-9764-357f90e4685b', 'Luis', NULL, 'Martinez', 'Diaz', 19.4513, -70.6976),
      ('d77ed0c0-eb62-45a2-8eee-b1d51e8a7b3e', 'Ana', 'M.', 'Lopez', NULL, 19.4530, -70.6950),
      ('ee1b7e10-7306-4052-a44a-176bcd5e6c69', 'Pedro', NULL, 'Reyes', 'Torres', 19.4500, -70.7000);

      INSERT INTO "drivers" ("id", "status", "personId")
      VALUES
      ('e0edd65a-0a33-477a-8ab3-59d2f826c4b6', 'Available', 'dc0ed381-ba43-4002-9384-bccf2b496db7'),
      ('338a0a41-01e8-4473-a6f0-7de64b47420f', 'Available', '5b936f74-dba2-49bf-b2f5-2a7ec2e652d5'),
      ('bfb7a311-8d26-456a-b03c-9dd418d26df6', 'Available', '33339b60-a57a-4b7e-b875-1127b195ca6b'),
      ('371533af-1a52-4cd7-ae0a-2bce3f822e3d', 'Available', '1c191662-1684-44f7-9c10-1471a9160e49'),
      ('9b88a09c-c8c7-4c39-af6e-4b706f2a60af', 'Available', '6de13b3c-cf32-4492-859f-dcff45c6b073'),
      ('fb19d138-a320-476e-8680-78e0e3492ff3', 'Available', 'c8b50ace-b60b-4bf4-9886-41bc08792e44'),
      ('73e828a9-858f-4702-a202-29c02bd1f8ec', 'Available', '51b92010-d52b-4ece-b484-95a540e2ec6e'),
      ('527d2a96-0f93-4a7a-b135-7e7228116eaa', 'Available', '0affa4c5-c616-40dd-bdf7-010eda2f6f4d'),
      ('7ac6f2fd-4196-46b8-9948-148ca4c4ec62', 'Available', 'f39c8a73-601d-4292-8059-8e3cb05762c2'),
      ('2e9e7390-a325-4503-9aa3-1051f1bbe78f', 'Available', 'ba44239c-4b46-4826-8257-07a737be3478'),
      ('82cbbb51-bd1a-47b2-9be7-abb7000f8048', 'Available', 'f3f99419-48f7-4eac-9764-357f90e4685b'),
      ('973bbda8-8869-4fb9-b31c-689cbfb0e015', 'Available', 'd77ed0c0-eb62-45a2-8eee-b1d51e8a7b3e'),
      ('4468ff12-2300-47c7-b590-5f73f76f419f', 'Available', 'ee1b7e10-7306-4052-a44a-176bcd5e6c69');

INSERT INTO "people" ("id", "firstName", "middleName", "lastName", "secondLastName", "latitude", "longitude")
      VALUES
      ('efd1cb83-619b-4bc2-880e-54eb52c504e1', 'Luis', 'A.', 'Torres', NULL, 18.4890, -69.9290),
      ('865e1be0-489b-4916-90b8-3d13bda223b5', 'Carmen', NULL, 'Vargas', 'Lopez', 18.4840, -69.9340),
      ('eb5bec2f-2f9d-42d7-953c-7a10909827cc', 'Roberto', NULL, 'Nunez', 'Gomez', 18.4910, -69.9390),
      ('f1fc0e0f-fada-4434-909e-286864e9103c', 'Elena', NULL, 'Hernandez', NULL, 18.4925, -69.9240),
      ('03b5fb2d-07e9-4adf-949e-50bf0deaa17f', 'Sandra', NULL, 'Jimenez', 'Ramos', 18.4815, -69.9210),
      ('5b96dee8-7c78-4cbd-bf83-e1eda850f082', 'Jorge', NULL, 'Diaz', NULL, 18.4860, -69.9145),
      ('5760d1c1-8380-4c43-8ebe-e5784db79769', 'Laura', 'M.', 'Soto', 'Alvarez', 18.4825, -69.9175),
      ('50fce1e6-486c-4b9c-800c-b130307edea2', 'Gabriel', NULL, 'Mora', 'Perez', 18.4935, -69.9315),
      ('a3fee064-fe68-4c3d-af6b-69c7866ebd98', 'Paola', NULL, 'Ramos', NULL, 18.4795, -69.9295),
      ('a52b7ba0-7349-476d-9c09-14d5a960e9ec', 'Diego', NULL, 'Salas', 'Castro', 18.4860, -69.9325),
      ('6c88b301-84a6-4b44-8145-7da49bbc83f0', 'Maria', NULL, 'Gonzalez', 'Perez', 19.4520, -70.6980);

      INSERT INTO "passengers" ("id", "personId")
      VALUES
      ('6ee55452-8b8a-4964-a891-bab9858623bc', 'efd1cb83-619b-4bc2-880e-54eb52c504e1'),
      ('eda02c8d-1a59-40b4-a47a-e34f225e8e93', '865e1be0-489b-4916-90b8-3d13bda223b5'),
      ('9223d677-7607-4517-8a4b-ee3633f2ff10', 'eb5bec2f-2f9d-42d7-953c-7a10909827cc'),
      ('f8e0c244-9629-45b0-9d67-0ce537f7c397', 'f1fc0e0f-fada-4434-909e-286864e9103c'),
      ('f0816ef9-3795-4bae-84c3-eb4791ab66fe', '03b5fb2d-07e9-4adf-949e-50bf0deaa17f'),
      ('a157c631-bcbc-4137-92b7-98504dc91c6b', '5b96dee8-7c78-4cbd-bf83-e1eda850f082'),
      ('d391f81f-756e-4b82-81a5-29daf08f9f3e', '5760d1c1-8380-4c43-8ebe-e5784db79769'),
      ('592ed77e-f1b3-4f33-a00a-71d7f41518d0', '50fce1e6-486c-4b9c-800c-b130307edea2'),
      ('e26593a7-e8cc-4e7a-b85a-605a24129a03', 'a3fee064-fe68-4c3d-af6b-69c7866ebd98'),
      ('34f3b555-0564-4d79-8d5d-9698883c0608', 'a52b7ba0-7349-476d-9c09-14d5a960e9ec'),
      ('c4736ecd-63be-40d2-ae4c-2b286cef3889', '6c88b301-84a6-4b44-8145-7da49bbc83f0');
