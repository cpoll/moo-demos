async function readFile(file)
{
    let content = await fetch(file);
    return content.text()
}

function parseCrossword(s) {
    let lines = s.split('\n');

    let crossword = [];
    let acrossHints = [];
    let downHints = [];

    // Get all the crossword (until we hit a blank line or the word "across")
    while (lines.length > 0) {
        let line = lines.shift().trim();

        if(line === 'across' || line === 'across:') break; // Stop once we find the across section
        if(line.trim().length === 0) continue; // Skip whitespace

        crossword.push(line);
    }

    // Get all the across hints (until we hit a blank line or the word "down")
    while(lines.length > 0) {
        let line = lines.shift().trim();

        if(line === 'down' || line === 'down:') break; // Stop once we find the down section
        if(line.trim().length === 0) continue; // Skip whitespace

        acrossHints.push(line);
    }

    // Get all the down hints (until we hit a blank line or the end of the file)
    while(lines.length > 0) {
        let line = lines.shift().trim();

        if(line.trim().length === 0) continue; // Skip whitespace

        downHints.push(line);
    }

    return {
        'crossword': crossword,
        'acrossHints': acrossHints,
        'downHints': downHints,
    };

}

async function main(file) {
    let crosswordText = await readFile('/crossword.txt');

    crosswordData = parseCrossword(crosswordText);
    console.log(crosswordData);

}

main();
