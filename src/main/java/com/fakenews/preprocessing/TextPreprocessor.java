package com.fakenews.preprocessing;

import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class TextPreprocessor {

    // A basic list of English stop words
    private static final Set<String> STOP_WORDS = new HashSet<>(Arrays.asList(
            "a", "an", "and", "are", "as", "at", "be", "but", "by",
            "for", "if", "in", "into", "is", "it",
            "no", "not", "of", "on", "or", "such",
            "that", "the", "their", "then", "there", "these",
            "they", "this", "to", "was", "will", "with"
    ));

    public String preprocess(String text) {
        if (text == null || text.trim().isEmpty()) {
            return "";
        }

        // 1. Lowercase conversion
        String lowerCaseText = text.toLowerCase();

        // 2. Removal of punctuation
        String noPunctuationText = lowerCaseText.replaceAll("[^a-z0-9\\s]", "");

        // 3. Tokenization & 4. Stopword filtering
        String[] tokens = noPunctuationText.split("\\s+");
        String result = Arrays.stream(tokens)
                .filter(word -> !STOP_WORDS.contains(word))
                .collect(Collectors.joining(" "));

        return result;
    }
}
