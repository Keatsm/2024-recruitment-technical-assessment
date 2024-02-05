from dataclasses import dataclass

@dataclass
class File:
    id: int
    name: str
    categories: list[str]
    parent: int
    size: int


"""
Task 1
"""
def leafFiles(files: list[File]) -> list[str]:
    # Convert to set for amortised O(1) deletion and access
    noOutgoingEdgeFiles = set(map(lambda file: file.id, files))
    # Remove files that are parents for other nodes from that set
    for file in files:
        if file.parent in noOutgoingEdgeFiles:
            noOutgoingEdgeFiles.remove(file.parent)
    # Filter to just files which have an id in our set
    return list(map(lambda file: file.name, filter(lambda file: file.id in noOutgoingEdgeFiles, files)))


"""
Task 2
"""
def kLargestCategories(files: list[File], k: int) -> list[str]:
    categoryCounts = {}
    for file in files:
        for category in file.categories:
            categoryCounts[category] = categoryCounts.get(category, 0) + 1
    # Negate the count field to put it in decreasing order
    return list(map(lambda categoryTuple: categoryTuple[0], sorted(categoryCounts.items(), key=lambda categoryTuple: (-categoryTuple[1], categoryTuple[0]))))[:min(k, len(files))]


"""
Task 3
"""

def dfs(graph, file):
    if file.id not in graph:
        return file.size
    total = 0
    for child in graph[file.id]:
        total += dfs(graph, child)
    return total + file.size

def largestFileSize(files: list[File]) -> int:
    # Create a graph/tree like structure with the edges flipped to make traversal easier
    graph = {}
    for file in files:
        if file.parent not in graph:
            graph[file.parent] = []
        graph[file.parent].append(file)
        
    maximumFileSize = 0
    for file in files:
        maximumFileSize = max(dfs(graph, file), maximumFileSize)
            
    return maximumFileSize


if __name__ == '__main__':
    testFiles = [
        File(1, "Document.txt", ["Documents"], 3, 1024),
        File(2, "Image.jpg", ["Media", "Photos"], 34, 2048),
        File(3, "Folder", ["Folder"], -1, 0),
        File(5, "Spreadsheet.xlsx", ["Documents", "Excel"], 3, 4096),
        File(8, "Backup.zip", ["Backup"], 233, 8192),
        File(13, "Presentation.pptx", ["Documents", "Presentation"], 3, 3072),
        File(21, "Video.mp4", ["Media", "Videos"], 34, 6144),
        File(34, "Folder2", ["Folder"], 3, 0),
        File(55, "Code.py", ["Programming"], -1, 1536),
        File(89, "Audio.mp3", ["Media", "Audio"], 34, 2560),
        File(144, "Spreadsheet2.xlsx", ["Documents", "Excel"], 3, 2048),
        File(233, "Folder3", ["Folder"], -1, 4096),
    ]

    assert sorted(leafFiles(testFiles)) == [
        "Audio.mp3",
        "Backup.zip",
        "Code.py",
        "Document.txt",
        "Image.jpg",
        "Presentation.pptx",
        "Spreadsheet.xlsx",
        "Spreadsheet2.xlsx",
        "Video.mp4"
    ]

    assert kLargestCategories(testFiles, 3) == [
        "Documents", "Folder", "Media"
    ]

    assert largestFileSize(testFiles) == 20992
