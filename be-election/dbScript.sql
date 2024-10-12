-- Create Candidate table
CREATE TABLE candidate (
    id SERIAL PRIMARY KEY,                  -- Auto-incrementing primary key
    name VARCHAR(100) NOT NULL,             -- Candidate name with a maximum length of 100 characters
    photo TEXT,                            -- Binary data for storing the photo (BLOB equivalent)
    votes INT NOT NULL,                     -- Number of votes received, cannot be null
    party VARCHAR(50) NOT NULL,             -- Political party, limited to 50 characters
    age INT NOT NULL,                       -- Age of the candidate
    experience VARCHAR(255)                 -- Candidate's experience, optional with a maximum length of 255 characters
);

