# Subtitle

[The SubRip file format](https://en.wikipedia.org/wiki/SubRip#SubRip_file_format) is described on the `Matroska` multimedia container format website as "perhaps the most basic of all subtitle formats." `SubRip (SubRip Text)` files are named with the extension `.srt`, and contain formatted lines of plain text in groups separated by a blank line. Subtitles are numbered sequentially, starting at 1. The timecode format used is hours:minutes:seconds,milliseconds with time units fixed to two zero-padded digits and fractions fixed to three zero-padded digits (00:00:00,000). The fractional separator used is the comma, since the program was written in France.

How to load data from subtitle (`.srt`) files

Please, download the [example .srt file from here](https://www.opensubtitles.org/en/subtitles/5575150/star-wars-the-clone-wars-crisis-at-the-heart-en).

```bash
pip install pysrt  

```

```python
from langchain.document\_loaders import SRTLoader  

```

```python
loader = SRTLoader(  
 "example\_data/Star\_Wars\_The\_Clone\_Wars\_S06E07\_Crisis\_at\_the\_Heart.srt"  
)  

```

```python
docs = loader.load()  

```

```python
docs[0].page\_content[:100]  

```

```text
 '<i>Corruption discovered\nat the core of the Banking Clan!</i> <i>Reunited, Rush Clovis\nand Senator A'  

```
