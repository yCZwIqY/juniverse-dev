CREATE TABLE career
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR NOT NULL,
    position   VARCHAR NOT NULL,
    start_date DATE    NOT NULL,
    end_date   DATE,
    contents   TEXT,
    in_office  BOOLEAN
);

CREATE TABLE tech
(
    id    SERIAL PRIMARY KEY,
    name  VARCHAR NOT NULL,
    level VARCHAR,
    type  VARCHAR
);

CREATE TABLE project
(
    id           SERIAL PRIMARY KEY,
    title        VARCHAR NOT NULL,
    images       TEXT[],
    videos       TEXT,
    start_date   DATE    NOT NULL,
    end_date     DATE,
    description  TEXT    NOT NULL,
    member_count INTEGER NOT NULL,
    git_hub_url  VARCHAR,
    demo_url     VARCHAR,
    roles        TEXT[],
    features     TEXT[]
);

CREATE TABLE career_tech_tech
(
    career_id INTEGER NOT NULL REFERENCES career (id) ON DELETE CASCADE,
    tech_id   INTEGER NOT NULL REFERENCES tech (id) ON DELETE CASCADE,
    PRIMARY KEY (career_id, tech_id)
);

CREATE TABLE project_tech_tech
(
    project_id INTEGER NOT NULL REFERENCES project (id) ON DELETE CASCADE,
    tech_id    INTEGER NOT NULL REFERENCES tech (id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tech_id)
);
