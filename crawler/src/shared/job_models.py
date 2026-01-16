from typing import List, Optional
from pydantic import BaseModel, Field

class TechStackItem(BaseModel):
    name: str = Field(description="Name of the technology (e.g., 'React', 'Kafka')")
    usage_context: str = Field(description="Inferred context of how this tech is used (e.g., 'Used for real-time data streaming')")
    proficiency_level: str = Field(description="Required proficiency level: 'Expert', 'Advanced', 'Intermediate', or 'Basic'")

class InterviewStrategy(BaseModel):
    technical_focus: List[str] = Field(description="Key technical topics to focus on during the interview")
    behavioral_focus: List[str] = Field(description="Key behavioral traits to verify (e.g., 'Leadership', 'Agility')")
    key_challenges: List[str] = Field(description="Anticipated challenges the candidate will face in this role")
    hidden_intent: List[str] = Field(description="Inferred hidden requirements or context not explicitly stated")

class JobAnalysisResult(BaseModel):
    company_summary: str = Field(description="Brief summary of the company and its domain")
    role_definition: str = Field(description="Clear definition of what this role entails")
    primary_tech_stack: List[TechStackItem] = Field(description="Core technologies required for the job")
    secondary_tech_stack: List[TechStackItem] = Field(description="Nice-to-have or peripheral technologies")
    interview_strategy: InterviewStrategy = Field(description="Strategy guide for the AI interviewer")
    
    # Meta
    analyzed_date: str = Field(description="Date of analysis")
    growth_potential_score: int = Field(description="Score 1-10 estimating technical growth potential")
