#!/bin/bash

PORT=3002
API_URL="http://localhost:$PORT/api"

echo "🚀 Testing Full Pipeline on port $PORT..."
echo ""

# Step 1: Start quiz
echo "📝 Starting quiz..."
START_RESPONSE=$(curl -s -X POST $API_URL/quiz/start \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "lastName": "User",
    "company": "ABC \"Tech\" & Co'"'"'s Solutions"
  }')

QUIZ_ID=$(echo $START_RESPONSE | grep -o '"quizId":"[^"]*' | cut -d'"' -f4)
echo "Quiz ID: $QUIZ_ID"

# Step 2: Submit quiz with all required fields
echo "✅ Submitting quiz responses..."
SUBMIT_RESPONSE=$(curl -s -X POST $API_URL/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{
    "quizId": "'$QUIZ_ID'",
    "responses": {
      "industry": "Technology & Software Development",
      "efficiencyRating": "gaps",
      "companySize": "small",
      "repetitiveTasks": ["data-entry", "customer-inquiries", "email-management"],
      "customerExperienceIssues": ["slow-responses", "repetitive-questions"],
      "moneyLeaks": ["manual-errors", "slow-processes"],
      "growthBottlenecks": ["too-much-manual-work", "cant-track-performance"],
      "currentSystems": ["spreadsheets", "basic-tools-only"],
      "desiredOutcome": ["focus-strategy", "scale-capacity"],
      "pastAttempts": ["too-complex", "no-time"],
      "teamCapability": "moderately-comfortable",
      "monthlyBudget": "2000-5000",
      "timeline": "within-3-months",
      "additionalContext": "Testing pipeline with special characters in company name"
    }
  }')

echo "$SUBMIT_RESPONSE" | python -m json.tool 2>/dev/null || echo "$SUBMIT_RESPONSE"

# Extract report ID and token
REPORT_ID=$(echo $SUBMIT_RESPONSE | grep -o '"reportId":"[^"]*' | cut -d'"' -f4)
TOKEN=$(echo $SUBMIT_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo ""
echo "Report ID: $REPORT_ID"
echo "Token: $TOKEN"
echo ""

# Step 3: Monitor progress
echo "⏳ Monitoring pipeline progress..."
echo ""

for i in {1..60}; do
  sleep 5
  
  STATUS_RESPONSE=$(curl -s -X GET $API_URL/reports/status/$REPORT_ID)
  STATUS=$(echo $STATUS_RESPONSE | grep -o '"report_status":"[^"]*' | cut -d'"' -f4)
  
  echo "[Attempt $i] Status: $STATUS"
  
  # Check stages
  if echo $STATUS_RESPONSE | grep -q '"stage1_problem_analysis":{'; then
    echo "  ✅ Stage 1: Problem Analysis - COMPLETE"
  fi
  if echo $STATUS_RESPONSE | grep -q '"stage2_tool_research":{'; then
    echo "  ✅ Stage 2: Tool Research - COMPLETE"
  fi
  if echo $STATUS_RESPONSE | grep -q '"stage3_curated_tools":{'; then
    echo "  ✅ Stage 3: Curated Tools - COMPLETE"
  fi
  if echo $STATUS_RESPONSE | grep -q '"stage4_report_content":{'; then
    echo "  ✅ Stage 4: Report Content - COMPLETE"
  fi
  
  if [ "$STATUS" = "completed" ]; then
    echo ""
    echo "🎉 Pipeline completed successfully!"
    echo "View report at: http://localhost:$PORT/report/view/$TOKEN"
    exit 0
  elif [ "$STATUS" = "failed" ]; then
    echo ""
    echo "❌ Pipeline failed!"
    echo "Full response:"
    echo "$STATUS_RESPONSE" | python -m json.tool
    exit 1
  fi
done

echo ""
echo "⚠️ Timeout: Pipeline did not complete within 5 minutes"
exit 1